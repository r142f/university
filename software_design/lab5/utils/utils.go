package utils

import "os"

func CreateDirIfNotExists(dirname string) {
	if _, err := os.Stat(dirname); os.IsNotExist(err) {
		if err := os.Mkdir(dirname, os.ModePerm); err != nil {
			panic(err)
		}
	}
}
