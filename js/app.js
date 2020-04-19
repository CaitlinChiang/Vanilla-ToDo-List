var input_check = {
	check: function() {
		var new_item = document.getElementById('todo_input').value;
		if (new_item.length == "") {
		}
		else {
			addTask_buttonFunctions.add();
		}
	}
}

var keyPress = function(e) {
    if (e.keyCode == 13) {
    	event.preventDefault();
        document.getElementById('add_button').click();
    }
    return true;
}

var addTask_buttonFunctions = {
	cancel: function() {
		document.getElementById('todo_input').value = "";
	},

	add: function() {
		var listNode = document.getElementById('ongoing_list');	
		//creating a new item in the ongoing list based from input  
		var node = document.createElement('LI');
		var new_item = document.getElementById('todo_input').value;
		var new_item_text = document.createElement('INPUT');
		new_item_text.setAttribute("type", "text");
		new_item_text.setAttribute("id", "input");
		new_item_text.disabled = true;
		new_item_text.value = new_item;
		node.appendChild(new_item_text);

		//creating a div to store the buttons for ongoing tasks
		var task_buttons = document.createElement('DIV');

		//done button 
		var done_button = document.createElement('BUTTON');
		done_button.innerText = "Done";
		done_button.setAttribute("id", "done_button");
		done_button.addEventListener("click", task_buttonFunctions.complete);
		task_buttons.appendChild(done_button);

		//edit button 
		var edit_button = document.createElement('BUTTON');
		edit_button.innerText = "Edit";
		edit_button.setAttribute("id", "edit_button");
		edit_button.addEventListener("click", task_buttonFunctions.edit);
		task_buttons.appendChild(edit_button);

		//delete button
		var delete_button = document.createElement('BUTTON');
		delete_button.innerText = "Delete";
		delete_button.setAttribute("id", "delete_button");
		delete_button.addEventListener("click", task_buttonFunctions.delete);
		task_buttons.appendChild(delete_button);

		//appending the div to the ongoing list along with the item
		task_buttons.setAttribute("id", "div_taskButtons");
		node.appendChild(task_buttons);
		listNode.insertBefore(node, ongoing_list.childNodes[-1]);

		//textfield restarts and buttons are not shown again
		addTask_buttonFunctions.cancel();
	}
}

var task_buttonFunctions = {
	complete: function() {
		//crossing over the item once accomplished
		list_item = this.parentElement.parentElement;
		list_item.querySelector('input').setAttribute("id", "input_done");

		//appending the item into the done list, and taking off the buttons from the ongoing list
		done_list = document.getElementById('done_list');
		done_list.appendChild(list_item);
		list_item.removeChild(this.parentElement);

		//creating a div to store the buttons for completed tasks
		var doneTask_buttons = document.createElement('DIV');

		//undo button 
		var undo_button = document.createElement('BUTTON');
		undo_button.innerText = "Undo";
		undo_button.setAttribute("id", "undo_button");
		undo_button.addEventListener("click", doneTasks_buttonFunctions.undo);
		doneTask_buttons.appendChild(undo_button);

		//delete button
		var delete_button = document.createElement('BUTTON');
		delete_button.innerText = "Delete";
		delete_button.setAttribute("id", "delete_button");
		delete_button.addEventListener("click", task_buttonFunctions.delete);
		doneTask_buttons.appendChild(delete_button);

		//appending the div buttons to the done list 
		doneTask_buttons.setAttribute("id", "div_doneTaskButtons");
		list_item.appendChild(doneTask_buttons);
		done_list.insertBefore(list_item, done_list.childNodes[-1]);

		document.getElementById('save_button').click();
	},

	edit: function() {
		var item_text = this.parentElement.parentElement;
		var previousData = item_text.querySelector('input').value;
		var edit_field = item_text.querySelector('input');
		edit_field.className = "edit_mode";
		edit_field.disabled = false;

		//when the enter key is pressed, it does the same functionality as the save button
		item_text.addEventListener("keydown", event => {
  			if (event.keyCode == 13) {
  				event.preventDefault();
    			save_button.click();
 			 }
  			return true;
		});

		//creating a div to store the buttons for edited tasks
		var cancel_save = document.createElement('DIV');

		//save button
		var save_button = document.createElement('BUTTON');
		save_button.innerText = "Save";
		save_button.setAttribute("id", "save_button");
		save_button.addEventListener("click", edit_functions.save);
		cancel_save.appendChild(save_button);

		//cancel button
		var cancel_editButton = document.createElement('BUTTON');
		cancel_editButton.innerText = "Cancel";
		cancel_editButton.setAttribute("id", "cancel_editButton");
		cancel_editButton.addEventListener("click", function(){
		    edit_field.value = previousData;
		    save_button.click();
		}, false);

		cancel_save.appendChild(cancel_editButton);

		//appending the editing div buttons to the list if it doesn't already exist
		if (typeof(document.getElementById('cancel_save')) !== 'undefined' && document.getElementById('cancel_save') !== null) {
     	}
     	else {
     		cancel_save.setAttribute("id", "cancel_save");
			item_text.appendChild(cancel_save);
     	}
	},

	delete: function() {
		this.parentElement.parentElement.remove();
	}
}

var doneTasks_buttonFunctions = {
	undo: function() {
		//appending the item back into the ongoing task list
		doneList_item = this.parentElement.parentElement;
		ongoing_list = document.getElementById('ongoing_list');
		ongoing_list.appendChild(doneList_item);
		doneList_item.querySelector('input').setAttribute("id", "input");

		//replacing the div buttons from the done list to the ongoing list created above
		doneList_item.removeChild(this.parentElement);

		//creating a div to store the buttons for ongoing tasks
		var task_buttons = document.createElement('DIV');

		//done button 
		var done_button = document.createElement('BUTTON');
		done_button.innerText = "Done";
		done_button.setAttribute("id", "done_button");
		done_button.addEventListener("click", task_buttonFunctions.complete);
		task_buttons.appendChild(done_button);

		//edit button 
		var edit_button = document.createElement('BUTTON');
		edit_button.innerText = "Edit";
		edit_button.setAttribute("id", "edit_button");
		edit_button.addEventListener("click", task_buttonFunctions.edit);
		task_buttons.appendChild(edit_button);

		//delete button
		var delete_button = document.createElement('BUTTON');
		delete_button.innerText = "Delete";
		delete_button.setAttribute("id", "delete_button");
		delete_button.addEventListener("click", task_buttonFunctions.delete);
		task_buttons.appendChild(delete_button);

		//appending the div to the ongoing list along with the item
		task_buttons.setAttribute("id", "div_taskButtons");
		doneList_item.appendChild(task_buttons);
		ongoing_list.insertBefore(doneList_item, ongoing_list.childNodes[-1]);
	}
}

var edit_functions = {
	save: function() {
		var edit_item = this.parentElement.parentElement;
		item = edit_item.querySelector('input');

		if (item.value == "") {
			item.placeholder = "Enter a new todo item:";
			item.disabled = true;
			edit_item.removeChild(this.parentElement);
			item.className = "none";
		}
		else {
			item.disabled = true;
			edit_item.removeChild(this.parentElement);
			item.className = "none";
		}
	}
}