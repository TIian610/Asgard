package debug

import (
	"fmt"

	"github.com/spf13/cobra"
)

func GetCmd() *cobra.Command {
	debugCmd.PersistentFlags().StringP("conf", "c", "conf", "config path")
	mailCmd.PersistentFlags().StringP("receiver", "r", "", "mail receiver")
	debugCmd.AddCommand(mailCmd)
	serverCmd.PersistentFlags().StringP("id", "i", "", "server id")
	serverCmd.PersistentFlags().StringP("port", "p", "", "server port")
	rpcCmd.AddCommand(serverCmd)
	rpcCmd.AddCommand(clientCmd)
	debugCmd.AddCommand(rpcCmd)
	return debugCmd
}

var debugCmd = &cobra.Command{
	Use:   "debug",
	Short: "debug cmds",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("there are cmds for debug")
	},
}
