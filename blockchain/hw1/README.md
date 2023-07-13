- https://github.com/gnosis/MultiSigWallet/blob/master/contracts/MultiSigWallet.sol - сделать, чтобы с баланса multisig-контракта за одну транзакцию не могло бы уйти больше, чем 66 ETH
```bash
diff --git a/MultiSigWallet.sol b/MultiSigWallet.sol
index 5a3717d..be18152 100644
--- a/MultiSigWallet.sol
+++ b/MultiSigWallet.sol
@@ -190,6 +190,7 @@ contract MultiSigWallet {
         public
         returns (uint transactionId)
     {
+        require(value <= 66 ether);
         transactionId = addTransaction(destination, value, data);
         confirmTransaction(transactionId);
     }
```
- https://github.com/OpenZeppelin/openzeppelin-contracts/blob/f2112be4d8e2b8798f789b948f2a7625b2350fe7/contracts/token/ERC20/ERC20.sol - сделать, чтобы токен не мог бы быть transferred по субботам
```bash
diff --git a/ERC20.sol b/ERC20.sol
index c6718e6..fd8aa15 100644
--- a/ERC20.sol
+++ b/ERC20.sol
@@ -208,7 +208,8 @@ contract ERC20 is Context, IERC20 {
     function _transfer(address sender, address recipient, uint256 amount) internal virtual {
         require(sender != address(0), "ERC20: transfer from the zero address");
         require(recipient != address(0), "ERC20: transfer to the zero address");
-
+        uint256 day = (block.timestamp + 3 days) % 1 weeks;
+        require(!(day >= 5 days && day < 6 days), "ERC20: transfer on Saturday");
         _beforeTokenTransfer(sender, recipient, amount);
 
         require(_balances[sender] >= amount, "ERC20: transfer amount exceeds balance");
```
- https://github.com/mixbytes/solidity/blob/076551041c420b355ebab40c24442ccc7be7a14a/contracts/token/DividendToken.sol - сделать чтобы платеж в ETH принимался только специальной функцией, принимающей помимо ETH еще комментарий к платежу (bytes[32]). Простая отправка ETH в контракт запрещена
```bash
diff --git a/DividendToken.sol b/DividendToken.sol
index ad8578c..93874ab 100644
--- a/DividendToken.sol
+++ b/DividendToken.sol
@@ -37,7 +37,7 @@ contract DividendToken is StandardToken, Ownable {
         }));
     }
 
-    function() external payable {
+    function commented(bytes32 comment) external payable {
         if (msg.value > 0) {
             emit Deposit(msg.sender, msg.value);
             m_totalDividends = m_totalDividends.add(msg.value);
```