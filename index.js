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

	let btnUpdate = document.createElement('button');
	btnUpdate.innerText = 'Update';

	let divForBtn = document.createElement('div');
	divForBtn.style.display = 'flex';

	btnDelete.addEventListener('click', () => itemDelete(element.id));

	tr.append(td);
	tr.append(td1);
	tr.append(td2);
	tr.append(td3);
	divForBtn.append(btnDelete);
	divForBtn.append(btnUpdate);
	tr.append(divForBtn);
	tbody.append(tr);
	btnUpdate.addEventListener('click', () => itemUpdate(element));
}

function add() {
	let info = {
		companyName: company.value,
		contactName: contact.value,
		contactTitle: contactTitle.value,
	};
	axios.post(url, info).then((res) => {
		axios
			.get(url)
			.then((response) => {
				response.data.forEach((element) => {
					showList(element);
				});
			})
			.then(() => {
				firstGetItems();
			});
	});
}

function itemUpdate(element) {
	company.value = element.companyName;
	contact.value = element.contactName;
	contactTitle.value = element.contactTitle;

	axios
		.put(`${url}/${element}`, {
			companyName: element.companyName,
			contactName: element.contactName,
			contactTitle: element.contactTitle,
		})
		.then((res) => {});
}

function firstGetItems() {
	tbody.innerHTML = '';
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			data.forEach((element) => {
				showList(element);
			});
		});
}

function itemDelete(id) {
	axios.delete(`${url}/${id}`).then(() => {
		firstGetItems();
	});
}

firstGetItems();
