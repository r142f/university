{-# LANGUAGE DerivingVia #-}

module HW3.Action where

import           Control.Exception          (Exception, throwIO)
import           Control.Monad.Trans.Reader (ReaderT (ReaderT))
import qualified Data.ByteString.Char8      as B8
import qualified Data.Sequence              as S
import           Data.Set                   (Set, member)
import qualified Data.Text                  as T
import           Data.Text.Encoding         (decodeUtf8')
import           Data.Time                  (getCurrentTime)
import           HW3.Base                   (HiAction (HiActionChDir, HiActionCwd, HiActionEcho,
                                             HiActionMkDir, HiActionNow, HiActionRand,
                                             HiActionRead, HiActionWrite),
                                             HiMonad (..),
                                             HiValue (HiValueBytes, HiValueList, HiValueNull,
                                             HiValueNumber, HiValueString, HiValueTime))
import           System.Directory           (createDirectory,
                                             doesDirectoryExist,
                                             getCurrentDirectory, listDirectory,
                                             setCurrentDirectory)
import           System.Random              (getStdRandom, uniformR)

data HiPermission
  = AllowRead
  | AllowWrite
  | AllowTime
  deriving (Eq, Ord, Enum, Bounded, Show)

data PermissionException
  = PermissionRequired HiPermission
  deriving (Show)

instance Exception PermissionException

newtype HIO a = HIO {runHIO :: Set HiPermission -> IO a}
  deriving (Functor, Applicative, Monad) via (ReaderT (Set HiPermission) IO)

instance HiMonad HIO where
  runAction act = HIO $ \s ->
    let isReadAllowed = member AllowRead s
        isWriteAllowed = member AllowWrite s
        isTimeAllowed = member AllowTime s
     in case act of
          HiActionRead fp ->
            if isReadAllowed
              then do
                isDirectory <- doesDirectoryExist fp
                case isDirectory of
                  True -> do
                    contents <- listDirectory fp
                    return $ HiValueList $ S.fromList $ HiValueString . T.pack <$> contents
                  False -> do
                    bytes <- B8.readFile fp
                    case decodeUtf8' bytes of
                      Right str -> return $ HiValueString str
                      _         -> return $ HiValueBytes bytes
              else throwIO $ PermissionRequired AllowRead
          HiActionWrite fp bytes ->
            if isWriteAllowed
              then B8.writeFile fp bytes >> (return HiValueNull)
              else throwIO $ PermissionRequired AllowWrite
          HiActionMkDir fp ->
            if isWriteAllowed
              then createDirectory fp >> (return HiValueNull)
              else throwIO $ PermissionRequired AllowWrite
          HiActionChDir fp ->
            if isReadAllowed
              then setCurrentDirectory fp >> (return HiValueNull)
              else throwIO $ PermissionRequired AllowRead
          HiActionCwd ->
            if isReadAllowed
              then (HiValueString . T.pack) <$> getCurrentDirectory
              else throwIO $ PermissionRequired AllowRead
          HiActionNow ->
            if isTimeAllowed
              then HiValueTime <$> getCurrentTime
              else throwIO $ PermissionRequired AllowTime
          HiActionRand intA intB ->
            HiValueNumber . toRational <$> getStdRandom (uniformR (intA, intB))
          HiActionEcho strA ->
            if isWriteAllowed
              then putStrLn (T.unpack strA) >> return HiValueNull
              else throwIO $ PermissionRequired AllowWrite
