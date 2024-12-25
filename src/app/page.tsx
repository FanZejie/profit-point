'use client';
import React, { useState } from 'react';
import { Flex, Radio } from 'antd';
import { Input, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { calculateExitPrice, calculateTrading } from '@/lib/winloseRange'

export default function Home() {
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [stopLossPrice, setStopLossPrice] = useState<number>(0);
    const [maxLossAmount, setMaxLossAmount] = useState<number>(0);

    const [lever, setLever] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [result, setResult] = useState<{ [key: string]: number }>({
        winRange1: 0,
        winRange2: 0,
        winRange3: 0
    });

    const [exitPrice, setExitPrice] = useState<number>(0);

    const options = [
        { label: '空单', value: false },
        { label: '多单', value: true },
    ];
    const [upOrDown, setUpOrDown] = useState<boolean>(true);

    const onChangeRadio = ({ target: { value } }: RadioChangeEvent) => {
        setUpOrDown(value);
      };

    // 处理计算函数
    const handleCalculate = () => {
        const points = calculateTrading(currentPrice, stopLossPrice, lever, amount);
        setResult(points);  // 更新结果
    };

    const handleCalculateStopLosePoint = () => {
        const temp = calculateExitPrice(currentPrice, maxLossAmount, lever, amount, upOrDown);
        setExitPrice(temp);
    }

    return (
        <div className="flex flex-row min-h-screen p-8 pb-20 items-center justify-items-center  sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className='w-1/2 flex flex-col items-center'>
                <h1 className='text-2xl py-2' >止盈点位计算器</h1>
                <p className='text-xs text-gray-600'>传入开仓金额、止损价格、杠杆倍数、投入金额，计算出应该在什么点位止盈，到达止损点损失</p>
                <div className='flex flex-row items-center my-2'>
                    <p className='w-[100px]'>开仓价格</p>
                    <Input
                        type="number"
                        className='w-[200px]'
                        placeholder="输入当前价格"
                        value={currentPrice}
                        onChange={(e) => setCurrentPrice(parseFloat(e.target.value))}
                    />
                </div>

                <div className='flex flex-row items-center my-2'>
                    <p className='w-[100px]'>止损价格</p>
                    <Input
                        type="number"
                        className='w-[200px]'
                        placeholder="输入止损价格"
                        value={stopLossPrice}
                        onChange={(e) => setStopLossPrice(parseFloat(e.target.value))}
                    />
                </div>
                <div className='flex flex-row items-center my-2'>
                    <p className='w-[100px]'>杠杆倍数</p>
                    <Input
                        type="number"
                        className='w-[200px]'
                        placeholder="输入杠杆倍数"
                        value={lever}
                        onChange={(e) => setLever(parseFloat(e.target.value))}
                    />
                </div>
                <div className='flex flex-row items-center my-2'>
                    <p className='w-[100px]'>投入金额</p>
                    <Input
                        type="number"
                        className='w-[200px]'
                        placeholder="输入投入金额"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                    />
                </div>



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
            </div>

            <div className='w-1/2  flex flex-col items-center'>
                <h1 className='text-2xl py-2'>止损点位计算器</h1>
                <p className='text-xs text-gray-600'>传入开仓金额、杠杆倍数、投入金额、最大损失金额，计算出应该在什么价格全部卖出</p>

                <div className='flex flex-row items-center my-2'>
                    <p className='w-[100px]'>开仓价格</p>
                    <Input
                        type="number"
                        className='w-[200px]'
                        placeholder="输入当前价格"
                        value={currentPrice}
                        onChange={(e) => setCurrentPrice(parseFloat(e.target.value))}
                    />
                </div>

                <div className='flex flex-row items-center my-2'>
                    <p className='w-[100px]'>最大损失金额</p>
                    <Input
                        type="number"
                        className='w-[200px]'
                        placeholder="输入止损价格"
                        value={maxLossAmount}
                        onChange={(e) => setMaxLossAmount(parseFloat(e.target.value))}
                    />
                </div>
                <div className='flex flex-row items-center my-2'>
                    <p className='w-[100px]'>杠杆倍数</p>
                    <Input
                        type="number"
                        className='w-[200px]'
                        placeholder="输入杠杆倍数"
                        value={lever}
                        onChange={(e) => setLever(parseFloat(e.target.value))}
                    />
                </div>
                <div className='flex flex-row items-center my-2'>
                    <p className='w-[100px]'>投入金额</p>
                    <Input
                        type="number"
                        className='w-[200px]'
                        placeholder="输入投入金额"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                    />
                </div>
                <div className='flex flex-row  my-2'>
                    <Flex vertical gap="middle">
                        <Radio.Group
                            block
                            options={options}
                            onChange={onChangeRadio}
                            value={upOrDown}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Flex>
                </div>



                <Button type="primary" onClick={handleCalculateStopLosePoint}>
                    计算止损点
                </Button>


                {exitPrice !== 0 && (
                    <div style={{ marginTop: 20 }}>
                        <p>最大损失金额：{maxLossAmount}</p>
                        <p>应该在价格：{exitPrice}全部卖出</p>
                    </div>
                )}
            </div>





        </div>
    );
}
