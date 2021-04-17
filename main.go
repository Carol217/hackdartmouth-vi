package main

import (
	"github.com/PGo-Projects/output"
	"github.com/Carol217/hackdartmouth-vi/internal/config"
	"github.com/Carol217/hackdartmouth-vi/internal/server"
	"github.com/spf13/cobra"
)

var (
	ServerCmd = &cobra.Command{
		Use: "hackdartmouth-vi",
		Run: server.MustRun,
	}
)

func init() {
	ServerCmd.PersistentFlags().StringVar(&config.Filename, "config", "",
		"config file (default is config.toml)")
	ServerCmd.PersistentFlags().BoolVar(&config.DevRun, "dev", false,
		"Run the server on a dev machine")
	cobra.OnInitialize(config.MustInit)
}

func main() {
	if err := ServerCmd.Execute(); err != nil {
		output.ErrorAndPanic(err)
	}
}
