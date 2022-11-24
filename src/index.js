const fetchBtn = document.querySelector("button");
const table = document.getElementById("table-container");
const baseUrl = "http://localhost:7777/";
const allElementsEndpoint = "elements";

const AppState = (loaded, state = null) => ({
  state,
  loaded,
  isLoaded: () => loaded,
  setLoaded: () => (loaded = true),
  setState: (newState) => (state = newState),
});

const State = AppState(false);

const getData = async () => {
  const res = await fetch(baseUrl + allElementsEndpoint);
  const data = await res.json();
  State.setLoaded();
  table.innerHTML = renderHtml(data);
  mountListeners();
};

fetchBtn.addEventListener("click", getData);

const boxStyles = `"width: 200px; border: 3px solid black; margin: 1rem 2rem; padding: .5rem; border-radius: 3px; box-shadow: 3px 3px 3px 1px rgba(25,25,25,.8)"`;
const renderHtml = (data) => `
    ${data
      .map(
        ({
          atomicMass,
          atomicNumber,
          atomicRadius,
          boilingPoint,
          bondingType,
          density,
          electronAffinity,
          ionizationEnergy,
          meltingPoint,
          name,
          oxidationStates,
          standardState,
          symbol,
          vanDelWaalsRadius,
          yearDiscovered,
        }) => {
          return `
            <div style=${boxStyles} class="element-box" data-name=${name}>
                <h2>${symbol}</h2>
                <p>${name}</p>
                <p>${atomicNumber}</p>
            </div>
        `;
        }
      )
      .join("")}
`;

const mountListeners = () => {
  const boxes = document.querySelectorAll(".element-box");
  boxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      let bg = e.target.style.backgroundColor;
      if (State.isLoaded()) {
        if (bg === "red") e.target.style.backgroundColor = "white";
        else e.target.style.backgroundColor = "red";
      }
      console.log(e.target.getAttribute("data-name"));
    });
  });
};
