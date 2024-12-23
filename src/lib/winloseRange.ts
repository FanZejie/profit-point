export default function calculateTrading(currentPrice: number, stopLossPrice: number, leverage: number, investment: number): { [key: string]: string } {
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
