/**
 * Google Spreadsheetからカテゴリー一覧を取得する。
 */

const FETCH_URL_CATEGORY = "https://script.google.com/macros/s/AKfycbzbQlXiptKqTNMUVvvQeVyRCRE0bX-A-L4oMZ0F_WxkeDkUbQPiHILMPGFqVDPPrBP_/exec";

// ダミーデータ
const categories = [
    {
        category1: "文学",
        category2: ["あ", "い", "う"]
    },
    {
        category1: "理学",
        category2: ["数学", "物理", "化学", "生物", "地学"]
    },
    {
        category1: "工学",
        category2: ["建築", "土木", "情報", "機械"]
    },
];

function updateCategory(ctgry) {
    const d = document.getElementById("category-list");
    
    // 子要素の全削除
    while (d.firstChild) {
        d.removeChild(d.firstChild);
    }

    // 要素を追加していく
    ctgry.forEach(category => {
        var detail = document.createElement("details");
        detail.className = "open:bg-purple-300 rounded open:shadow-md border-purple-600 p-1 my-1";

        var summary = document.createElement("summary");
        summary.className = "text-lg font-bold hover:bg-purple-300 p-1 rounded cursor-pointer";
        summary.innerHTML = category.category1;
        detail.appendChild(summary);

        var div = document.createElement("div");
        div.className = "flex items-center";

        var btnDiv = document.createElement("div");
        var btn = document.createElement("button");
        btn.className = "bg-purple-600 text-white px-8 py-1 rounded-full hover:bg-purple-500 m-2 text-2xl";
        btn.setAttribute("onclick", `HandleCategorySearch(1, "${category.category1}")`)
        btn.innerHTML = category.category1;
        btnDiv.appendChild(btn);
        div.appendChild(btnDiv);

        var ul = document.createElement("ul");
        ul.className = "ml-4";
        category.category2.forEach(subCategory => {
            var li = document.createElement("li");
            var sBtn = document.createElement("button");
            sBtn.className = "bg-purple-600 text-white px-8 py-1 rounded-full hover:bg-purple-500 m-1 cursor-pointer";
            sBtn.setAttribute("onclick", `HandleCategorySearch(2, "${subCategory}")`)
            sBtn.innerHTML = subCategory;
            li.appendChild(sBtn);
            ul.appendChild(li);
        });
        div.appendChild(ul);

        detail.appendChild(div);
        d.appendChild(detail);
    });
}

async function getCategories() {
    const url = FETCH_URL_CATEGORY + `?type=category`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Categories fetched:", data); // デバッグ用にデータをコンソールに表示
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

window.addEventListener("load", async function () {
    try {
        const categories = await getCategories();
        if (categories) {
            updateCategory(categories);
        }
    } catch (error) {
        console.error('Error on load:', error);
    }
});