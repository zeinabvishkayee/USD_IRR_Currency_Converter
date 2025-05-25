import React, { useCallback, useState } from 'react';
import './style.css'
type ConversionType = 'DOLLAR_RIAL' | 'RIAL_DOLLAR';

const CurrencyConverter = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [outputValue, setOutputValue] = useState<string>('');
  const [conversionMode, setConversionMode] = useState<ConversionType>('DOLLAR_RIAL');
  const EXCHANGE_RATE = 830_000;

  const calculateConversion = useCallback(() => {
    const numericValue = parseFloat(inputValue);
    if (isNaN(numericValue))return;

    const result = conversionMode === 'DOLLAR_RIAL' 
      ? numericValue * EXCHANGE_RATE  
      : numericValue / EXCHANGE_RATE;
 //نمایش نتیجه به فرمت محلی فارسی 
  setOutputValue(result.toLocaleString('fa-IR'));
       }, [inputValue, conversionMode]);


  return (
    <section className="EXCHANGE-RATE-container">
      <div className="mode-selector">
       <button
          className={`mode-btn ${conversionMode === 'DOLLAR_RIAL' ? 'active' : ''}`}
          onClick={() => setConversionMode('DOLLAR_RIAL')}
        > USD به ریال
        </button>

        <button
          className={`mode-btn ${conversionMode === 'RIAL_DOLLAR' ? 'active' : ''}`}
          onClick={() => setConversionMode('RIAL_DOLLAR')}
        > ریال به USD
        </button>
      </div>

      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) =>{
          let value = e.target.value;

          //تغییر اعداد فارسی به انگلیسی
         value = value.replace(/[\u06F0-\u06F9]/g, (digit) =>
         String.fromCharCode(digit.charCodeAt(0) - 0x06F0 + 48)
    );

         //حذف کردن همه چیز به غیر از اعداد و نقطه
       value = value.replace(/[^0-9.]/g, '');

        //جلوگیری از ایجاد بیش از یک نقطه در متغیرvalue
       value = value.replace(/(\..*)\./g, '$1');
       setInputValue(value);   
        }   
      }
       placeholder={conversionMode === 'DOLLAR_RIAL' ? 'مقدار دلار' : 'مقدار ریال'}
        />
      </div>

      <button className="action-btn" onClick={calculateConversion}>
        محاسبه کن
      </button>

      {outputValue && (
        <div className="result-display">
          <span className="result-value">{outputValue}</span>
          <span className="result-unit">
            {conversionMode === 'DOLLAR_RIAL' ? 'ریال' : 'دلار'}
          </span>
        </div>
      )}
    </section>
  );
};

export default CurrencyConverter;