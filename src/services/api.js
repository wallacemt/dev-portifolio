import axios from 'axios';

const token = import.meta.env.VITE_GITHUB_TOKEN;

const fetchReadmeFromGitHub = async (owner, repo) => {
    try {
        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/contents/README.md`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.data || !response.data.content) {
            console.warn("Nenhum conteúdo encontrado no README.");
            return null;
        }

        const content = response.data.content;
        const decodedContent = atob(content);

        return decodedContent;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.warn("README não encontrado no repositório:", repo);
            return null; // Retorna null em vez de uma mensagem de erro
        }

        console.error("Erro ao carregar o README do GitHub:", error);
        return "Erro ao carregar o README. Tente novamente mais tarde.";
    }
};

export default fetchReadmeFromGitHub;
