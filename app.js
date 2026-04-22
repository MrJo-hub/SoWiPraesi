async function getHTML(code) {
    const codeList = await fetch('./code.json');
    const data = await codeList.json();

    return (data.codes[code]) ? data.codes[code] : null;
}
async function extraSiteLoader(code) {
    const info = await getHTML(code);

    if (info != null) {
        // info.file ist der Pfad zur Datei in deiner JSON (z.B. "content/demokratie.html")
        try {
            const response = await fetch(`./content/${info}.html`);
            if (!response.ok) throw new Error("Datei nicht gefunden");

            const htmlContent = await response.text(); // Hier wird die Datei als Text gelesen

            // 2. In das main-Element einfügen
            main.innerHTML = htmlContent;

            // Fehler-Klasse entfernen, falls sie vorher da war
            codeBtn.classList.remove("wrong");
        } catch (err) {
            console.error("Fehler beim Laden der Inhaltsdatei:", err);
            main.innerHTML = "<p>Inhalt konnte nicht geladen werden.</p>";
        }
    }
}