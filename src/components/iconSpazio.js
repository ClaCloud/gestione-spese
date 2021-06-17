import dateFormat from 'dateformat';
import CurrencyFormat from 'react-currency-format';
import React from 'react';
import { Link } from 'react-router-dom';

function Box(props) {
	var CurrencyFormat = require('react-currency-format');

	const id = props.id;
	const link = props.link ?? "#";
	const nome = props.nome;
	const bilancio = props.bilancio;
	const colore = props.colore;
	const icona = props.icona;
	const nuovo = props.nuovo;

	return (
		<Link to={link} id={`Spazio_${id}`} className={`spazio ${nuovo ? ('nuovo') : (null)}`} data-id={id}>
			<div className="icona ui-sortable-handle" style={{ backgroundColor: colore }}>
				{nuovo ? (
					<span>+</span>
				) : (
					<img src={icona} alt="icona spazio" />
				)}
			</div>
			{nuovo ? (
				<div className="info"><span className="nome">Nuovo Spazio</span></div>
			) : (
				<div className="info">
					<span className="nome">{nome}</span>
					<CurrencyFormat value={bilancio} isNumericString={true} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} renderText={value =>
						<span className="bilancio">
							€ {value}
						</span>
					} />
				</div>
			)}
		</Link>
	)
}

export default Box;
