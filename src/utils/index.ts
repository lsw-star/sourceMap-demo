import axios from 'axios';
import sourceMap from 'source-map-js'

const getSourceMap = async(url:string) => {
    const res = await axios.get(url);
    return res
}

const findCodeBySourceMap = async (stackframe:any) => {
    // 获取map文件 (真实情况，URL + '文件名.map') URL是另一服务器地址
    const sourceData = await getSourceMap(stackframe.fileName + '.map');
    const fileContent = sourceData.data;

    console.log('fileContent',fileContent);
    // 解析map文件
    const consumer = await new sourceMap.SourceMapConsumer(fileContent);
    // 解析源代码位置
    const originalPosition = consumer.originalPositionFor({
        line: stackframe.lineNumber,
        column: stackframe.columnNumber - 1 // 注意这里的列数需要减一，因为source-map的列是从0开始的
    });
    const code =  consumer.sourceContentFor(originalPosition.source);

    console.log('code', code);
}

export {
    findCodeBySourceMap
}