const add_content = document.getElementById('container').innerHTML;
const del_content = document.getElementById('container2').innerHTML;
const view_content = document.getElementById('container3').innerHTML;
document.getElementById("add").addEventListener("click", function (event) {
	event.preventDefault();
	document.getElementById('container').innerHTML = add_content;
	document.getElementById('container2').style.display = 'none';
	document.getElementById('container3').style.display = 'none';
	document.getElementById('container').style.display = 'block';
	document.getElementById("ok").addEventListener("click", function (event) {
		event.preventDefault(); // Prevent form submission

		var numberInput = document.getElementById("numberInput");
		var numInputs = parseInt(numberInput.value);

		if (numInputs && numInputs > 0) {
			var dynamicInputs = document.createElement("div");
			dynamicInputs.classList.add("dynamic-inputs");

			for (var i = 1; i <= numInputs; i++) {
				var inputGroup = document.createElement("div");
				inputGroup.classList.add("form-group");

				var label = document.createElement("label");
				label.textContent = "Airport " + i;

				var input = document.createElement("input");
				input.type = "text";
				input.name = "airport";
				input.required = true;

				var label2 = document.createElement("label");
				label2.textContent = "Departue ";

				var time = document.createElement("input");
				time.type = "time";
				time.name = "time";
				time.required = true;

				inputGroup.appendChild(label);
				inputGroup.appendChild(input);
				inputGroup.appendChild(label2);
				inputGroup.appendChild(time);
				dynamicInputs.appendChild(inputGroup);
			}

			var form = document.getElementById("AddForm");
			form.appendChild(dynamicInputs);

			numberInput.value = numInputs;// Reset the number input field
			numberInput.disabled = true;
			document.getElementById('ok').style.display = 'none';
			document.getElementById('submit').hidden = false;
		}
	});
});

document.getElementById('delete').addEventListener("click", function (event) {
	event.preventDefault();
	document.getElementById('container').style.display = 'none';
	document.getElementById('container3').style.display = 'none';
	document.getElementById('container2').innerHTML = del_content;
	document.getElementById('container2').style.display = 'block';
});

document.getElementById('view').addEventListener('click', function (event) {
	event.preventDefault();
	document.getElementById('container').style.display = 'none';
	document.getElementById('container2').style.display = 'none';
	document.getElementById('container3').innerHTML = view_content;
	document.getElementById('container3').style.display = 'block';
});



