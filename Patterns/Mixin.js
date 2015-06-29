// Source: Pagina 84 do livro: The Principles of Object Oriented Javascripta

// ***Na realidade eh um Object Pattern***

function mixin(receiver, supplier) {
	//implementacao rigorosa que vai copiar todas as propriedades com exatamente as mesmas definicoes
	if (Object.getOwnPropertyDescriptor) {
		Object.keys(supplier).forEach(function(property) {
			var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
			Object.defineProperty(receiver, property, descriptor);
		});
	} else {
		//implementacao menos rigorosa. ex: private accessor se tornorao publicos
		for (var property in supplier) {
			if (supplier.hasOwnProperty(property)) {
				receiver[property] = supplier[property]
			}
		}
	}
return receiver;
}