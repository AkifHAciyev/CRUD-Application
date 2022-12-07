let company = document.getElementById('company');
let contact = document.getElementById('contact');
let contactTitle = document.getElementById('contactTitle');
let tbody = document.getElementById('tbody');
let url = 'https://northwind.vercel.app/api/suppliers';

let newProduct = {
	companyName: company.value,
	contactName: contact.value,
	contactTitle: contactTitle.value,
};

function showList(element) {
	let tr = document.createElement('tr');
	let td = document.createElement('td');
	td.innerHTML = element.id;

	let td1 = document.createElement('td');
	td1.innerHTML = element.companyName;

	let td2 = document.createElement('td');
	td2.innerHTML = element.contactName;

	let td3 = document.createElement('td');
	td3.innerHTML = element.contactTitle;

	let btnDelete = document.createElement('button');
	btnDelete.innerText = 'Delete';
	btnDelete.style.cursor = 'pointer';

	btnDelete.addEventListener('click', () => itemDelete(element.id), UpdateSupplier(element.id));

	console.log(element);
	tr.append(td);
	tr.append(td1);
	tr.append(td2);
	tr.append(td3);
	tr.append(btnDelete);
	tbody.append(tr);
}

function add() {
	let info = {
		companyName: company.value,
		contactName: contact.value,
		contactTitle: contactTitle.value,
	};
	axios.post(url, info).then((res) => {
		console.log(res);
		axios.get(url).then((response) => {
			response.data.forEach((element) => {
				showList(element);
			});
		});
	});
}

async function UpdateSupplier(id) {
	await axios({
		method: 'put',
		url: `${url}/${id}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newProduct),
	});
}

function firstGetItems() {
	document.querySelector('tbody').innerHTML = '';
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			data.forEach((element) => {
				showList(element);
			});
		});
}

function itemDelete(id) {
	axios.delete(`${url}/${id}`);
}

firstGetItems();
