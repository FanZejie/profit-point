'use client';
import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';
import calculateTrading from '@/lib/winloseRange'

export default function Home() {
   const [currentPrice, setCurrentPrice] = useState<number>(0);
      const [stopLossPrice, setStopLossPrice] = useState<number>(0);
      const [lever, setLever] = useState<number>(0);
      const [amount, setAmount] = useState<number>(0);
      const [result, setResult] = useState<{ [key: string]: string }>({
          winRange1: '',
          winRange2: '',
          winRange3: ''
      });
  
        // 处理计算函数
        const handleCalculate = () => {
          const points = calculateTrading(currentPrice, stopLossPrice, lever, amount);
          setResult(points);  // 更新结果
      };

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div >
                  <h1 >止盈止损计算器</h1>
                  <Space direction="vertical" style={{ width: '100%' }}>
                      <Input
                          type="number"
                          placeholder="输入当前价格"
                          value={currentPrice}
                          onChange={(e) => setCurrentPrice(parseFloat(e.target.value))}
                      />
                      <Input
                          type="number"
                          placeholder="输入止损价格"
                          value={stopLossPrice}
                          onChange={(e) => setStopLossPrice(parseFloat(e.target.value))}
                      />
                      <Input
                          type="number"
                          placeholder="输入杠杆倍数"
                          value={lever}
                          onChange={(e) => setLever(parseFloat(e.target.value))}
                      />
                       <Input
                          type="number"
                          placeholder="输入投入金额"
                          value={amount}
                          onChange={(e) => setAmount(parseFloat(e.target.value))}
                      />
                      <Button type="primary" onClick={handleCalculate}>
                          计算止盈点
                      </Button>

                      <p>只需要抓中间一段，做好止盈，到达第一止盈点，将止损更改为入场价格</p>
      
                      {result.winRange1 && (
                          <div style={{ marginTop: 20 }}>
                              <p>第1止盈点：{result.winRange1}，到达第一止盈点，将止损更改为入场价格: {currentPrice}</p>
                              <p>第2止盈点：{result.winRange2}</p>
                              <p>第3止盈点：{result.winRange3}</p>
                              <p>止损预计亏损金额：{result.loss}</p>
                          </div>
                      )}
                  </Space>
              </div>
      
    </div>
  );
}
