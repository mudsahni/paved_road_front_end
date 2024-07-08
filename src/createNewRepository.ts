import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: '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'
});

async function cloneAndModifyRepo() {
    const owner = 'mudsahni';
    const repo = 'spring_boot_rest_api_template';
    const newRepoName = 'spring_boot_rest_api_template_2';

    try {
        // Create a new repository
        const newRepo = await octokit.repos.createForAuthenticatedUser({
            name: newRepoName,
            private: true
        });

        // Get the content of the original repository
        const content = await octokit.repos.getContent({
            owner,
            repo,
            path: ''
        });

        // Clone and modify files
        if (Array.isArray(content.data)) {
            for (const file of content.data) {
                if (file.type === 'file') {
                    const fileContent = await octokit.repos.getContent({
                        owner,
                        repo,
                        path: file.path
                    });

                    if ('content' in fileContent.data) {
                        let decodedContent = Buffer.from(fileContent.data.content, 'base64').toString('utf-8');

                        // Check if the file is pom.xml
                        if (file.name.toLowerCase() === 'pom.xml') {
                            decodedContent = modifyPomXml(decodedContent);
                        }

                        // Create or update the file in the new repository
                        await octokit.repos.createOrUpdateFileContents({
                            owner: newRepo.data.owner.login,
                            repo: newRepoName,
                            path: file.path,
                            message: `Add ${file.name}`,
                            content: Buffer.from(decodedContent).toString('base64')
                        });
                    }
                }
            }
        }

        console.log(`Repository cloned and modified: ${newRepo.data.html_url}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

function modifyPomXml(content: string): string {
    const newProjectName = 'NewProjectName'; // Replace with your desired project name
    return content.replace(
        /<name>([^<]+)<\/name>/,
        `<name>${newProjectName}</name>`
    );
}
cloneAndModifyRepo();
