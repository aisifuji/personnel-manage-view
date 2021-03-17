// 导出excel方法
//colums 导出模板 例如[{title:'导出表头',key:'表头对应的key'}]
//list   导出数据
export function exportExcel(columns,list){
    require.ensure([], () => {
        const { export_json_to_excel } = require('./excel/Export2Excel');
        let tHeader = []
        let filterVal = []
        columns.forEach(item =>{
            tHeader.push(item.title)
            filterVal.push(item.key)
        })
        const data = list.map(v => filterVal.map(j => v[j]))
        export_json_to_excel(tHeader, data, '数据列表');
    })
}

