import { flags } from "@oclif/command";
import { ApolloCommand, useFlags } from "../command";

export default class ConfigTest extends ApolloCommand {
  static description = "command to test config loading";
  static flags = {
    ...useFlags(["config", "project"]),
    test: flags.string()
  };

  // setting this will skip the config loading process
  // public ignoreConfig: boolean = true;

  async run() {
    this.requireflags([
      [
        "project",
        "Must provide a project name with this command. Use --project"
      ]
    ]);

    this.log(JSON.stringify(this.projectConfig));
  }
}
