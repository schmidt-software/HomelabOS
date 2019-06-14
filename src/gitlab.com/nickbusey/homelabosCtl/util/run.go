package util

import (
	"bufio"
	"fmt"
	"os/exec"
	"strings"
)

// RunCmd takes a command and args and runs it, streaming output to stdout
func RunCmd(cmdName string, cmdArgs []string) error {
	fmt.Printf("==> Running: %s %s\n", cmdName, strings.Join(cmdArgs, " "))
	//return fmt.Errorf("bye")
	cmd := exec.Command(cmdName, cmdArgs...)
	cmdReader, err := cmd.StdoutPipe()
	if err != nil {
		return err
	}

	scanner := bufio.NewScanner(cmdReader)
	go func() {
		for scanner.Scan() {
			fmt.Printf("%s\n", scanner.Text())
		}
	}()

	err = cmd.Start()
	if err != nil {
		return err
	}

	err = cmd.Wait()
	if err != nil {
		return err
	}
	return nil
}
