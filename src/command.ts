import { Command, flags } from "@oclif/command";
import { readFileSync } from "fs";

/**
 * Selects a set of reusable flags that any command can use. This is to
 * prevent flags being used on the base class that get inherited by
 * every command without them explicitly asking for them.
 *
 * @param names list of flag names that the implementing command wishes to use.
 */
export function useFlags(names: Array<string>) {
  const allFlags = {
    config: flags.string({
      char: "c",
      description: "path to a config.json file"
    }),
    project: flags.string({
      char: "p",
      description: "what project to run a command on"
    }),
    help: flags.help({ char: "h" })
  };

  const selectedFlags = {};
  names.forEach(name => {
    if (!(name in allFlags)) {
      throw new Error(`Flag name ${name} not found`);
    }
    (selectedFlags as any)[name] = (allFlags as any)[name];
  });
  return selectedFlags;
}

export class ApolloCommand extends Command {
  /**
   * the representation of the config file, with base config
   * options merged onto the project configs
   */
  public config: any;
  /**
   * like config but only for a specific project.
   * like config.projects[myProject]
   */
  public projectConfig: any;
  /**
   * If this is set true by the extending class, the init function
   * will not load the config. This can be used for commands like
   * login which don't need the extra work of loading a config.
   */
  public ignoreConfig: boolean = false;

  /**
   * This init just laods up the config file based on the
   * `--config` and `--project` flags
   */
  async init() {
    // TODO --- fix error handling here
    if (!this.ignoreConfig) this.loadConfig();
  }

  /**
   * Config loading funciton -- this loads the config from a .json file,
   * merges the base config and the `projects` and sets the class' config
   *
   * XXX move this fn to another place?
   */
  async loadConfig() {
    /**
     * this.constructor pulls flags from the extended class,
     * allowing the extended class' flags to be used, not just the
     * flags on the base class
     */
    const { flags } = this.parse(this.constructor as any);
    let rawConfig, config;
    try {
      const defaultPath = ".apollo/config.json";
      rawConfig = readFileSync(flags.config || defaultPath, "utf8");
      config = JSON.parse(rawConfig);
    } catch (e) {
      throw new Error("Could not load config. Check your config path");
    }

    if (!config.projects) this.config = config;

    let projects: { [name: string]: any } = {};
    for (const projectName in config.projects) {
      projects[projectName] = {
        ...config,
        ...config.projects[projectName]
      };
      delete projects[projectName].projects;
    }
    this.config = { projects };

    this.projectConfig = flags.project
      ? this.config.projects[flags.project]
      : this.config;
    if (flags.project && !this.projectConfig) {
      if (!this.config.projects)
        throw new Error(
          "You used the --project flag, but your config does not list any `projects`. Try adding `projects` to your config or don't use the --projects flag"
        );
      throw new Error(
        `A project matching --project=${flags.project} cannot be found. Make sure you didn't misspell the project name.`
      );
    }
    this.debug(`Config Loaded: ${JSON.stringify(this.config)}`);
  }

  /**
   * Helper for checking to see if a flag is required. Useful for dynamically requiring
   * flags without having to manually throw for each flag missing.
   *
   * For example, if you had two flags (a & b ) that were only required if the _other_
   * was also present...
   *
   * ```
   * (flags.a || flags.b)
   *   && requireFlags([['a', 'message'], ['b', 'message']])
   * ```
   *
   * @param requiredFlags array of tuples in the format [flagName, errorMessage].
   */
  requireflags(requiredFlags: Array<[string, string]>) {
    const { flags: usedFlags } = this.parse(this.constructor as any);
    requiredFlags.forEach(([name, errorMessage]) => {
      /**
       * the "project" flag is the one exception. A project can either be a
       * flag defined project or the base of the config if no "config.projects"
       * are defined
       */
      if (name === "project" && !("projects" in this.config)) return;
      if (!(name in usedFlags)) throw new Error(errorMessage);
    });
  }

  async run() {
    // do nothing
  }
}
