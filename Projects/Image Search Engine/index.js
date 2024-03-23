let keyword = "";
let page = 1;
///////////////////////////////////////////////////////

const searchInput = document.querySelector("#search-box");

const searchBtn = document.querySelector("#search-btn");

const searchResult = document.querySelector("#search-result");

const showMoreBtn = document.querySelector("#show-more-btn");
/////////////////////////////////////////////////////
async function searchImages() {
    showMoreBtn.style.display = "none";
    keyword = searchInput.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=xMCA__EPqkBBXRst1TuGf0AiQrI-kSKOGqqE1gYNdT0&per_page=12`;

    console.log(keyword);
    console.log(url);

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    showMoreBtn.style.display = "block";
    if (data.results.length > 0) {
        searchResult.style.display = "grid";
        const results = data.results;

        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);

            searchResult.appendChild(imageLink);
        });
    } else {
        searchResult.textContent = "Nenhum resultado encontrado...";
        searchResult.style.display = "flex";
        searchResult.style.justifyContent = "center";
    }
}

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    searchResult.innerHTML = "";
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
