package main

import (
	"gitlab.com/nickbusey/homelabosCtl/cmd"
)

func main() {
	// fileURL := "https://gitlab.com/NickBusey/HomelabOS/raw/master/Dockerfile"

	// if err := DownloadFile("/private/tmp/Dockerfile.HomelabOS", fileURL); err != nil {
	// 	panic(err)
	// }

	// fmt.Println("deploy called")

	// fmt.Println(RunCmd("docker", []string{"build", "-f", "/private/tmp/Dockerfile.HomelabOS", ".", "-t", "homelabos"}))

	cmd.Execute()
}
