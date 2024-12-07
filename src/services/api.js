import axios from 'axios';

const token = import.meta.env.VITE_GITHUB_TOKEN;

const fetchReadmeFromGitHub = async (owner, repo) => {
    try {
        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/contents/README.md`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,  // Usando o token de import.meta.env
                },
            }
        );
        
        const content = response.data.content;

        // Decodifica o conteúdo base64 para texto
        const decodedContent = atob(content);

        return decodedContent; // Retorna o conteúdo do README
    } catch (error) {
        console.error("Erro ao carregar o README do GitHub:", error);
        return "Erro ao carregar o README. Tente novamente mais tarde.";
    }
};

export default fetchReadmeFromGitHub;
