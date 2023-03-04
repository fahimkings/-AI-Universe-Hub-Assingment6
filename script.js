const LoadTools = () => {
    ToggleSpinner(true); 
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(URL)
        .then(response => response.json())
        .then(data => DisplayLoadTools(data.data.tools.slice(0, 6)))
        .catch(error => console.error(error));
}

const sortToolsByDate = (tools) => {
    tools.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
}

const DisplayLoadTools = (details) => {
    const Container = document.getElementById('card-container');
    Container.innerHTML = '';

    document.getElementById('sort-data').addEventListener('click', function () {
        sortToolsByDate(details);
        DisplayLoadTools(details);
    })

    details.forEach(detail => {
        const { name,features,published_in,id } = detail;
        const NewDiv = document.createElement('div');
        NewDiv.classList.add('col')
        NewDiv.innerHTML = `
        <div class="card h-100">
            <img src="${detail.image}" class="card-img-top p-3 h-75">
            <div class="card-body">
                <h5 class="card-title fw-bold">Features</h5>
                <p class="card-text fw-semibold text-secondary">1. ${features[0]}</p>
                <p class="card-text fw-semibold text-secondary">2. ${features[1]}</p>
                <p class="card-text fw-semibold mb-4 text-secondary">3. ${features[2] ? features[2] : 'There are no feature'}</p>
                <hr>
                <h5 class="card-title fw-bold">${name}</h5>
                <div class="d-flex align-items-center justify-content-between">
                    <p class="card-text"><i class="bi bi-calendar2-week-fill"></i> ${new Date(published_in)}</p>     
                    <button type="button" onclick="LoadToolsDetails('${id}')" class="btn btn-danger fw-semibold" data-bs-toggle="modal" data-bs-target="#featuresDetails">
                        Details
                    </button>          
                </div>
            </div>
        </div>   
        `;
        Container.appendChild(NewDiv);
    })
    ToggleSpinner(false);
}

const LoadToolsDetails = (detailsId) => {
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${detailsId}`;
    fetch(URL)
        .then(response => response.json())
        .then(data => DisplayLoadToolsDetails(data.data));
}

const DisplayLoadToolsDetails = (data) => {
    const ModalHeading = document.getElementById('modal-heading');
    ModalHeading.innerText = data.tool_name;
    const modalTitle = document.getElementById('featuresDetailsLabel')
    modalTitle.innerText = data.description;
    const modalImage = document.getElementById('img-tag');
    modalImage.innerHTML = `
        <img src="${data.image_link[0]}" class="card-img-top h-75"  alt="">
    `;
    const basicPricing = document.getElementById('basic')
    basicPricing.innerHTML = `
        <p class="text-center text-success fw-bold m-0 p-0">${data.pricing ? data.pricing[0].plan : 'Free of Cost/'}</p>
        <p class="text-center text-success fw-bold m-0 p-0">${data.pricing ? data.pricing[0].price : 'Basic'}</p>
    `
    const proPricing = document.getElementById('pro')
    proPricing.innerHTML = `
        <p class="text-center text-warning fw-bold m-0 p-0">${ data.pricing ? data.pricing[1].plan : 'Free of Cost/'}</p>
        <p class="text-center text-warning fw-bold m-0 p-0">${ data.pricing ? data.pricing[1].price : 'Pro'}</p>
    `
    const enterprisePricing = document.getElementById('enterprise')
    enterprisePricing.innerHTML = `
        <p class="text-center text-danger fw-bold m-0 p-0">${data.pricing ? data.pricing[2].plan : 'Free of Cost/'}</p>
        <p class="text-center text-danger fw-bold m-0 p-0">${data.pricing ? data.pricing[2].price :'Enterprise'}</p>
    `
    const featureHeader = document.getElementById('featureHeader');
    featureHeader.innerHTML = `
        <h3>Features</h3>
    `
    const allFeatures = document.getElementById('all-features')
    allFeatures.innerHTML = `
        <li>${data.features ? data.features["1"].feature_name : 'No Features Name'}</li>
        <li>${data.features ? data.features["2"].feature_name : 'No Features Name'}</li>
        <li>${data.features ? data.features["3"].feature_name : 'No Features Name'}</li>
    `
    const accuracy = document.getElementById('accuracy');
    accuracy.innerHTML = `
        <p>${data.accuracy.score === null ? 'No' : (data.accuracy.score)*100}% accuracy</p>
    `;
    const integrationsHeader = document.getElementById('integrations-header');
    integrationsHeader.innerHTML = `
        <h3>Integrations</h3>
    `
    const allintegrations = document.getElementById('all-integrations')
    allintegrations.innerHTML = `
        <li>${(data.integrations === null || data.integrations[0]===undefined)? 'No data found' : data.integrations[0]}</li>
        <li>${(data.integrations === null || data.integrations[1]===undefined)? 'No data found' : data.integrations[1]}</li>
        <li>${(data.integrations === null || data.integrations[2]===undefined)? 'No data found' : data.integrations[2]}</li>
	<li>${(data.integrations === null || data.integrations[3]===undefined)? 'No data found' : data.integrations[3]}</li>
    `
    const inputOutput = document.getElementById('input-output');
    inputOutput.innerHTML = `
        <h3 class="text-center">${data.input_output_examples===null? 'No input found': data.input_output_examples[0].input}</h3>
        <h6 class="text-center">${data.input_output_examples===null ?'No output found': data.input_output_examples[0].output }</h6>
    `
}

// toggle spinner
const ToggleSpinner = (IsLoading) => {
    const SpinnerSection = document.getElementById('spinner-loader');
    if (IsLoading) {
        SpinnerSection.classList.remove('d-none');
    }
    else {
        SpinnerSection.classList.add('d-none');
    }
}

const DisplayAllDataTogether = () => {
    ToggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(response => response.json())
        .then(data=> DisplayLoadTools(data.data.tools));
}

LoadTools();
