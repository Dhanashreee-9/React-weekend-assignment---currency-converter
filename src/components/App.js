import React,{useEffect,useState} from "react";
import CurrencyConverter from './CurrencyConverter';
import '../styles/App.css';

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=b7eec2c2d7e762d109e168e946207d15'

const App = () => {
   const [currencyOptions,setCurrencyOptions] =useState([]);
   const [currencyOptions1,setCurrencyOptions1] =useState([]);
   const[fromCurrency , setFromCurrency] =useState();
   const[toCurrency , setToCurrency] =useState();
   const[exchangeRate,setExchangeRate] =useState();
   const[amount,setAmount]=useState(0);
   const[amountInFromCurrency,setAmountInFromCurrency]=useState(true); 
   //console.log(currencyOptions);

   let toAmount ,fromAmount
   if(amount>=0){
    if(amountInFromCurrency){
      fromAmount= amount
      toAmount=amount * exchangeRate
    }else{
     toAmount = amount
      fromAmount= amount / exchangeRate
    }
   }
   

  useEffect(() => {
   fetch(BASE_URL)
   .then(res=>res.json())
   .then(data=>{
     
    const firstCurrency= Object.keys(data.rates)[149];
    const secondCurrency= Object.keys(data.rates)[66];
     setCurrencyOptions([data.base ,...Object.keys(data.rates)])
     setCurrencyOptions1([data.base ,...Object.keys(data.rates)])
     setFromCurrency(firstCurrency);
     setToCurrency(secondCurrency);
     setExchangeRate(data.rates[secondCurrency]);
   }
 )
  }, [])
  
  useEffect(() => {
    if(amount>0){
      if (fromCurrency != null && toCurrency != null) {
        fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
          .then(res => res.json())
          .then(data => setExchangeRate(data.rates[toCurrency]))
      }
    }
   
  }, [fromCurrency, toCurrency])


  function handleFromAmountChange(e){
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  
  function handleToAmountChange(e){
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div id="main"  className="App">
      <CurrencyConverter currencyOptions={currencyOptions}
      currencyOptions1={currencyOptions1}
      selectedCurrency={fromCurrency} 
      selectedCurrency2={toCurrency}
      onChangeCurrency={event=>setFromCurrency(event.target.value)}
      onChangeCurrency2={event=>setToCurrency(event.target.value)}
      onChangeAmount={handleFromAmountChange}
      onChangeAmount1={handleToAmountChange}
      amount={fromAmount}
      amount1={toAmount}
       />
    </div>
  )
}


export default App;
