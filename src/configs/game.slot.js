module.exports =

/* eslint-disable */
module.exports = {
	factory:{
		// address: '0xfb0a55a4cbf8da92baa3865d31d5f63b347eb0a2',
		address: '0xa05cd60a877f0a5f9e211e0cf35496ae387edd6f',
		abi:     [{'constant':true,'inputs':[],'name':'meta_name','outputs':[{'name':'','type':'string'}],'payable':false,'type':'function'},{'constant':true,'inputs':[],'name':'meta_link','outputs':[{'name':'','type':'string'}],'payable':false,'type':'function'},{'constant':true,'inputs':[],'name':'developer','outputs':[{'name':'','type':'address'}],'payable':false,'type':'function'},{'constant':false,'inputs':[],'name':'createGameChannel','outputs':[{'name':'Address','type':'address'}],'payable':false,'type':'function'},{'constant':true,'inputs':[],'name':'meta_version','outputs':[{'name':'','type':'uint256'}],'payable':false,'type':'function'},{'constant':true,'inputs':[],'name':'meta_code','outputs':[{'name':'','type':'string'}],'payable':false,'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'validGames','outputs':[{'name':'','type':'bool'}],'payable':false,'type':'function'},{'inputs':[{'name':'dev','type':'address'},{'name':'version','type':'uint256'},{'name':'code','type':'string'},{'name':'name','type':'string'},{'name':'link','type':'string'}],'payable':false,'type':'constructor'},{'anonymous':false,'inputs':[{'indexed':false,'name':'','type':'address'}],'name':'Channel','type':'event'}]
	},

	abi:[{"constant":false,"inputs":[{"name":"money","type":"uint256"}],"name":"refund","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"meta_name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"gameDeveloper","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"getOpenChannel","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"meta_factory","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"deposit","type":"uint256"}],"name":"newChannel","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"BankrollDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokenAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"player","type":"address"},{"name":"value","type":"uint256"},{"name":"add","type":"bool"}],"name":"closeChannel","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"meta_link","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"allChannels","outputs":[{"name":"player","type":"address"},{"name":"balance","type":"uint256"},{"name":"open","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"refAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"meta_version","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"meta_code","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"inputs":[{"name":"newOwner","type":"address"},{"name":"dev","type":"address"},{"name":"version","type":"uint256"},{"name":"code","type":"string"},{"name":"name","type":"string"},{"name":"link","type":"string"},{"name":"factory","type":"address"}],"payable":false,"type":"constructor"}]
}
