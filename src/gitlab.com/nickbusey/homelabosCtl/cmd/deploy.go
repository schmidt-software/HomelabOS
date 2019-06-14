package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
	"gitlab.com/nickbusey/homelabosCtl/util"
)

// deployCmd represents the deploy command
var deployCmd = &cobra.Command{
	Use:   "deploy",
	Short: "Deploy HomelabOS",
	Long: `This command will deploy HomelabOS to any servers that are configured,
including cloud bastion hosts.`,
	Run: func(cmd *cobra.Command, args []string) {
		cmdName := "docker"
		cmdArgs := []string{"run", "homelabos", "ansible-playbook", "-i", "inventory", "/HomelabOS/playbook.homelabos.yml"}
		fmt.Println(util.RunCmd(cmdName, cmdArgs))
	},
}

func init() {
	rootCmd.AddCommand(deployCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// deployCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// deployCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
