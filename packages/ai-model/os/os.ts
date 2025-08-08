const BASE_WORK_DIR = process.env.BASE_WORK_DIR || "/tmp/mob-worker";

if (!Bun.file(BASE_WORK_DIR).exists()) {
  Bun.write(BASE_WORK_DIR, "");
}

export async function onFileUpdate(filePath: string, fileContent: string) {
    await Bun.write(`${BASE_WORK_DIR}/${filePath}`, fileContent);
}

export function onShellCommand(shellCommand: string) {
    const commands = shellCommand.split("&&");
    for (const command of commands) {
        console.log(`Running Command: ${command}`);
        const result = Bun.spawnSync({
            cmd: command.split(" "),
            cwd: BASE_WORK_DIR
        });
    }
}
