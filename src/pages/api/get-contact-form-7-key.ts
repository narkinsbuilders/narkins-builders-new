export default async function handler(req, res) {
    try {
        const response = await fetch('https://admin.narkinsbuilders.com/fe08ce6/');
        if (!response.ok) {
            return res.status(response.status).text('Failed to fetch HTML content');
        }

        const htmlContent = await response.text();
        const match = htmlContent.match(/<input[^>]+name=["']_wpcf7_unit_tag["'][^>]+value=["']([^"']+)["']/);

        if (match) {
            return res.status(200).text(match[1]);
        } else {
            return res.status(404).text('_wpcf7_unit_tag not found');
        }
    } catch (error) {
        return res.status(500).json('Internal Server Error: ' + error.message);
    }
}
