import React from 'react'
import './CurrencyConverter.css';

export default function CurrencyConverter(props) {
    const{currencyOptions,
      currencyOptions1,
    selectedCurrency,
    selectedCurrency2,
    onChangeCurrency,
    onChangeCurrency2,
    amount,amount1,
    onChangeAmount,
    onChangeAmount1
   }=props
    return (
        <div>
            <h1>Currency Converter</h1>
            <select value={selectedCurrency} onChange={onChangeCurrency} >
           
            {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))} 
            </select>
            <input type="number" value={amount} onChange={onChangeAmount}/>


            <div className="second">
            <select  value={selectedCurrency2} onChange={onChangeCurrency2}>
            
            {currencyOptions1.map(options => (
          <option key={options} value={options}>{options}</option>
        ))} 
            </select>
            <input type="number"  value={amount1} onChange={onChangeAmount1}/>
            </div>
            
        </div>
    )
}
