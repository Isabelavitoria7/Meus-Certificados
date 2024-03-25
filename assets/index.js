let certificates = []


function createLabel(forName, text){
    const label = document.createElement('label')
    label.setAttribute('for', forName)
    label.textContent = text
    return label
}

async function saveCertificate(ev){
    ev.preventDefault
    const title = document.querySelector('#title').value
    const description = document.querySelector('#description').value
    const optionCertificate = document.querySelector('#option').value

    try {
        const response = await fetch ('http://localhost:3000/certificates' , {
            method: 'POST', 
            body: JSON.stringify({title, description, optionCertificate}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const certificate = response.json()
        certificates.push(certificate)

        if(!response.ok){
            throw new Error('Erro ao salvar certificado')
        }
        
        console.log('Certificado salvo com sucesso!')
        
    } catch(error){
        console.log(error);
    }
}

function createForm(){
    const form = document.createElement('form')
    const containerForm = document.createElement('div')
    containerForm.classList.add('container-form')
    const divP = document.createElement('div')
    divP.classList.add('divP')
    const divInput = document.createElement('div')
    divInput.classList.add('divInput')

    const frase = document.createElement('p')
    frase.innerText = 'Adicione as características do novo certificado.'

    const titleCertificate = document.createElement('input')
    titleCertificate.classList.add('title-certificate')
    titleCertificate.id = 'title'
    titleCertificate.type = 'text'
    titleCertificate.autocomplete = 'off'
    titleCertificate.placeholder = 'Nome do Curso:'
    titleCertificate.required = true; // Tornar obrigatório

    const descriptionSkills = document.createElement('input')
    descriptionSkills.classList.add('description-skills')
    descriptionSkills.id = 'description'
    descriptionSkills.type = 'text'
    descriptionSkills.autocomplete = 'off'
    descriptionSkills.placeholder = 'Competências:'
    descriptionSkills.required = true;

    //opções de cursos para selção do certificado 
    const optionCertificate = document.createElement('select')
    optionCertificate.classList.add('option-certificate')
    optionCertificate.id = 'option'
    const options = ['HTML5', 'CSS3', 'JAVASCRIPT', 'GIT E GITHUB']

    const placeholderOption = document.createElement('option');
    placeholderOption.textContent = 'Certificado';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    optionCertificate.appendChild(placeholderOption);

    options.forEach(optionText => {
        const option = document.createElement('option')
        option.value = optionText
        option.classList.add('selectedOption')
        option.textContent = optionText;
        optionCertificate.append(option)
    })

    const saveBtn = document.createElement('button')
    saveBtn.classList.add('save-btn')
    saveBtn.textContent = 'Salvar'
    form.addEventListener('submit', saveCertificate)

    const divForm = document.createElement('div')
    divForm.classList.add('form-overlay')

    divP.append(frase)
    divInput.append(titleCertificate, descriptionSkills, optionCertificate)
    containerForm.append(divP, divInput, saveBtn)
    form.append(containerForm) 
    divForm.append(form)
    document.querySelector('#areaCertificate').append(divForm)
}


const newCertificateBtn = document.querySelector('.newCertificateBtn')
newCertificateBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Impede o comportamento padrão do clique do botão
    createForm(); // Chama a função createForm
});

async function fetchCertificates() {
    return await fetch("http://localhost:3000/certificates").then(res => res.json())
}


function renderTitleCertificate(title, optionCertificate){
    const container = document.querySelector('#courses');
    const divBtn = document.createElement('div')
    divBtn.classList.add('button-wrapper')
    btnCourse = document.createElement('button')
    btnCourse.classList.add('btn-course')
    btnCourse.textContent = title
    divBtn.append(btnCourse)
    container.append(divBtn);


    btnCourse.addEventListener('click', ()  =>{
        renderImageCertificate(optionCertificate)
    })
}

function renderImageCertificate(option){
    const container = document.querySelector('#areaCertificate')
    container.innerHTML = '';
    
    const img = document.createElement('img')
    img.src = `../images/${option}.jpg`
    img.alt = 'Imagem do certificado.'
    
    container.appendChild(img)

}


async function setup(){
    const results = await fetchCertificates()
    certificates.push(...results)
    results.forEach(cert => {
        renderTitleCertificate(cert.title, cert.optionCertificate);
    });
}


//botao menu celular

const buttonMenu = document.querySelector('.hamburger')
buttonMenu.addEventListener('click', function() {
    const coursesDiv = document.getElementById('courses');
    if (coursesDiv.style.display === 'none') {
        coursesDiv.style.display = 'block';
        buttonMenu.classList.add('open');
    } else {
        coursesDiv.style.display = 'none';
        buttonMenu.classList.remove('open');
    }
});


document.addEventListener("DOMContentLoaded", setup)




 
    

    
    
    
