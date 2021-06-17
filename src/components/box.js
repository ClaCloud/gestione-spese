import dateFormat from 'dateformat';
import CurrencyFormat from 'react-currency-format';
import React from 'react';
import { Link } from 'react-router-dom';

function Box(props) {
	var CurrencyFormat = require('react-currency-format');

	const id = props.id;
	const motivo = props.motivo;
	const data = props.data;
	const link = props.link ?? "#";
	const prezzo = props.prezzo;
	const nonPrezzo = props.nonPrezzo;
	const metodo = props.metodo;
	const categoria = props.categoria;
	const categoriaFilter = props.categoriaFilter;
	const appunti = props.appunti;
	const appuntiFilter = props.appuntiFilter;
	const icona = props.icona;
	const colore = props.colore;

	return (
		<Link to={link} className="box" data-id={id}>
			<div className="hidden">
				<span className="categoria">{categoriaFilter}</span>
				<span className="appunti">{appuntiFilter}</span>
				<span className="data-filter">{data}</span>
				<span className="prezzo-filter">{prezzo}</span>
				<span className="metodo-filter">{metodo}</span>
			</div>

			{icona !== undefined ? (
				<div className="icona" style={{ backgroundColor: colore }}>
					<img src={icona} alt="" width="100%" />
				</div>
			) : (null)}

			{motivo !== undefined || data !== undefined ? (
				<div className="dati">
					<div className="motivo">
						{motivo}
					</div>
					{data !== undefined ? (
						<div className="data">
							{dateFormat(data, "dd mmmm yyyy")}
						</div>
					) : (null)}
				</div>
			) : (null)}

			{prezzo !== undefined ? (
				<CurrencyFormat value={prezzo} isNumericString={true} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} renderText={value =>
					<div className={`prezzo daBlur ${prezzo > 0 ? ('green') : ('alert')}`}>
						€ {value}
					</div>
				}/>
			) : (null)}

			{nonPrezzo !== undefined ? (
				<div className={`prezzo`}>
					{nonPrezzo}
				</div>
			) : (null)}

			{categoria !== undefined ? (
				<div className="categoria">
					{categoria}
				</div>
			) : (null)}

			{appunti !== undefined ? (
				<div className="appunti">
					{appunti}
				</div>
			) : (null)}
		</Link>
	)
}

export default Box;
