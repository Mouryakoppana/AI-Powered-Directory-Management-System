// === DEFAULT_RULES from Python ===
const DEFAULT_RULES = {
    // Documents
    pdf: "Documents",
    doc: "Documents",
    docx: "Documents",
    txt: "Documents",
    ppt: "Documents",
    pptx: "Documents",
    xls: "Documents",
    xlsx: "Documents",

    // Images
    jpg: "Images",
    jpeg: "Images",
    png: "Images",
    gif: "Images",
    bmp: "Images",
    svg: "Images",

    // Audio
    mp3: "Audio",
    wav: "Audio",
    aac: "Audio",
    flac: "Audio",

    // Video
    mp4: "Videos",
    mkv: "Videos",
    avi: "Videos",
    mov: "Videos",

    // Code
    py: "Code",
    c: "Code",
    cpp: "Code",
    java: "Code",
    js: "Code",
    html: "Code",
    css: "Code",
    php: "Code",

    // Archives
    zip: "Archives",
    rar: "Archives",
    "7z": "Archives",
    tar: "Archives",
    gz: "Archives"
};

// We'll use localStorage instead of rules.json
const STORAGE_KEY = "ai_dir_manager_rules";

// === load_rules() ===
function loadRules() {
    const rules = { ...DEFAULT_RULES };
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const userRules = JSON.parse(saved);
            Object.assign(rules, userRules);
        } catch (e) {
            console.warn("Warning: Could not read saved rules, using default rules only.");
        }
    }
    return rules;
}

// === save_user_rules() ===
function saveUserRules(allRules) {
    const userRules = {};
    for (const ext in allRules) {
        if (!DEFAULT_RULES[ext] || DEFAULT_RULES[ext] !== allRules[ext]) {
            userRules[ext] = allRules[ext];
        }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userRules));
}

// === get_extension() ===
function getExtension(filename) {
    const parts = filename.split(".");
    if (parts.length <= 1) return "";
    return parts.pop().toLowerCase();
}

// === Render rules in a table ===
function renderRulesTable(rules) {
    const container = document.getElementById("rulesContainer");
    const entries = Object.entries(rules).sort((a, b) => a[0].localeCompare(b[0]));

    if (entries.length === 0) {
        container.innerHTML = "<p>No rules defined.</p>";
        return;
    }

    let html = `
        <table class="rules-table">
            <thead>
                <tr>
                    <th>Extension</th>
                    <th>Category</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (const [ext, cat] of entries) {
        const type = DEFAULT_RULES[ext] ? "Default" : "User";
        html += `
            <tr>
                <td>.${ext}</td>
                <td>${cat}</td>
                <td>${type}</td>
            </tr>
        `;
    }

    html += "</tbody></table>";
    container.innerHTML = html;
}

// === Render summary of categorized files ===
function renderSummary(summary) {
    const container = document.getElementById("summaryContainer");
    const categories = Object.keys(summary);
    if (categories.length === 0) {
        container.innerHTML = "<p>No files processed yet.</p>";
        return;
    }

    let html = `
        <table class="summary-table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Count</th>
                    <th>Files</th>
                </tr>
            </thead>
            <tbody>
    `;
    let totalFiles = 0;

    for (const cat of categories.sort()) {
        const files = summary[cat];
        totalFiles += files.length;
        html += `
            <tr>
                <td class="category-name">${cat}</td>
                <td>${files.length}</td>
                <td class="file-list">${files.join(", ")}</td>
            </tr>
        `;
    }

    html += `
            <tr>
                <td><strong>Total</strong></td>
                <td><strong>${totalFiles}</strong></td>
                <td></td>
            </tr>
        </tbody>
    </table>
    `;

    container.innerHTML = html;
}

// === Main "organize_files" logic (simulated) ===
function organizeFilesFromInputs() {
    const fileInput = document.getElementById("fileInput");
    const dirInput = document.getElementById("dirInput");
    const status = document.getElementById("status");

    const files = [
        ...Array.from(fileInput.files),
        ...Array.from(dirInput.files)
    ];

    if (files.length === 0) {
        status.textContent = "Please select some files first.";
        return;
    }

    let rules = loadRules();
    const categoriesSet = new Set(Object.values(rules));
    const summary = {}; // category -> [file names]

    const interactive = true; // same as interactive=True in Python

    files.forEach(file => {
        // Use relative path if folder selection, else simple file name
        const filename = file.webkitRelativePath || file.name;
        const ext = getExtension(filename);

        let category;

        if (!ext) {
            category = "NoExtension";
        } else if (rules[ext]) {
            category = rules[ext];
        } else {
            // === ask_user_for_category() equivalent ===
            if (interactive) {
                const existingCategories = Array.from(categoriesSet).sort().join(", ");
                let msg = `New file type detected: .${ext}`;
                if (existingCategories) {
                    msg += `\nExisting categories: ${existingCategories}`;
                }
                msg += `\nEnter category name for this extension (leave blank for "Others")`;
                let input = window.prompt(msg, "");
                if (!input || !input.trim()) {
                    input = "Others";
                }
                category = input.trim();
                rules[ext] = category;
                categoriesSet.add(category);
                saveUserRules(rules);
            } else {
                category = "Others";
            }
        }

        if (!summary[category]) {
            summary[category] = [];
        }
        summary[category].push(filename);
    });

    status.textContent = "Organizing complete (simulation only – files are not moved).";
    renderSummary(summary);
    renderRulesTable(rules);
}

// === Reset rules to defaults ===
function resetRules() {
    localStorage.removeItem(STORAGE_KEY);
    const rules = loadRules();
    renderRulesTable(rules);
    document.getElementById("status").textContent = "Rules reset to default.";
}

// === main() equivalent for web page ===
document.addEventListener("DOMContentLoaded", () => {
    const rules = loadRules();
    renderRulesTable(rules);

    document.getElementById("organizeBtn").addEventListener("click", organizeFilesFromInputs);
    document.getElementById("resetRulesBtn").addEventListener("click", resetRules);
});
