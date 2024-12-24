export function calculateTrading(currentPrice: number, stopLossPrice: number, leverage: number, investment: number): { [key: string]: string } {
    const isUpward: boolean = currentPrice > stopLossPrice; // 判断方向
    const points = calculatePoints(currentPrice, stopLossPrice, isUpward);
    const loss = calculateLoss(currentPrice, stopLossPrice, leverage, investment);
    return  {
        ...points,
        loss
    };
}

const calculatePoints = (currentPrice: number, stopLossPrice: number, isUpward: boolean): { [key: string]: string } => {
    const lossRange: number = Math.abs(currentPrice - stopLossPrice); // 获取波动范围
    const directionMultiplier: number = isUpward ? 1 : -1; // 根据方向选择加减

    // 计算各止盈点
    const winRange1: string = (currentPrice + directionMultiplier * lossRange).toFixed(2);
    const winRange2: string = (currentPrice + directionMultiplier * lossRange * 2).toFixed(2);
    const winRange3: string = (currentPrice + directionMultiplier * lossRange * 3).toFixed(2);

    return {
        winRange1,
        winRange2,
        winRange3
    };
};

// 计算亏损金额
const calculateLoss = (currentPrice: number, stopLossPrice: number, leverage: number, investment: number): string => {
    const lossRange: number = Math.abs(currentPrice - stopLossPrice); // 获取波动范围
    const ethAmount: number = investment / currentPrice; // 计算买入的ETH数量
    const lossAmount: number = lossRange * ethAmount * leverage; // 计算亏损金额
    return lossAmount.toFixed(2); // 返回亏损金额，保留两位小数
};


/**
 * 计算全部卖出的目标价格
 * @param openAmount 开仓金额（USD）
 * @param leverage 杠杆倍数
 * @param investedAmount 投入金额（USD）
 * @param maxLossAmount 最大损失金额（USD）
 * @returns 卖出目标价格
 */
export function calculateExitPrice(
    openAmount: number, 
    maxLossAmount: number,
    leverage: number, 
    investedAmount: number, 
    upOrDown: boolean = true
  ): number {
    console.log(openAmount, leverage, investedAmount, maxLossAmount);
    // 验证输入参数是否有效
    if (openAmount <= 0 || leverage <= 0 || investedAmount <= 0 || maxLossAmount <= 0) {
      throw new Error("所有参数必须为正数");
    }
  
    if (maxLossAmount > investedAmount) {
      throw new Error("最大损失金额不能超过投入金额");
    }

    let temp1 = maxLossAmount * openAmount
    let temp2 = investedAmount * leverage
    let res : number = 0
    if(upOrDown){
       res  = openAmount - (temp1 / temp2)
    }else{
       res = openAmount + (temp1 / temp2)
    }
   
    return parseFloat(res.toFixed(2)); // 返回保留两位小数的价格
  }