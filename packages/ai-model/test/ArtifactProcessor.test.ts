import { expect, test } from "bun:test";
import { ArtifactProcessor } from "../parser/ArtifactProcessor";

test("Action with shell and file", () => {
    const mobAction = `
        <mobArtifact>
            <mobAction type="shell">
                npm run start
            </mobAction>
            <mobAction type="file" filePath="src/index.js">
                console.log("Hello, world!");
            </mobAction>
        </mobArtifact>
    `;

    const artifactProcessor = new ArtifactProcessor(mobAction, (filePath, fileContent) => {
        expect(filePath).toBe("src/index.js");
        expect(fileContent).toContain("console.log(\"Hello, world!\")")
    }, (shellCommand: string) => {
        console.log(shellCommand);
        expect(shellCommand).toContain("npm run start");
    })

    artifactProcessor.parse();
    artifactProcessor.parse();

    expect(artifactProcessor.currentArtifact).not.toContain("<mobAction>");
})

test("Action with appends", () => {
    const mobAction = `<boltArtifact>
          <mobAction type="shell">
              npm run start
          </mobAction>
          <mobAction type="file" filePath="src/index.js">
              console.log("Hello, world!");
          </mobAction>
      `
    const artifactProcessor = new ArtifactProcessor(mobAction, (filePath, fileContent) => {
      expect(filePath).toBe("src/index.js");
      expect(fileContent).toContain("console.log(\"Hello, world!\");");
    }, (shellCommand) => {
      console.log(shellCommand);
      expect(shellCommand).toContain("npm run start");
    });
  
    artifactProcessor.parse();
    artifactProcessor.append(`
        <mobAction type="shell">
            npm run start
        </mobAction>
    `);
    artifactProcessor.parse();
    artifactProcessor.parse();
    artifactProcessor.append(`
        <mobAction type="file" filePath="src/index.js">
            console.log("Hello, world!");
        </mobAction>
    `);
    artifactProcessor.parse();
    expect(artifactProcessor.currentArtifact).not.toContain("<mobAction>");
  
})