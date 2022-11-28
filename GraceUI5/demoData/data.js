var products = [
	{
		"img": "../../pagesD/static/images/jnw.jpg",
		"title": "",
		"price": "￥698.99",
		"name": "聚能王",
		"picUrl":"https://www.tn-hs.com/pms-pic/2022-07-16/55664107-6a41-490c-984c-f7c44ef0f665.jpg"
	},{
		"img": "../../pagesD/static/images/smxlpz.jpg",
		"title": "",
		"price": "￥698.99",
		"name": "石墨烯领跑者",
		"picUrl":"https://www.tn-hs.com/pms-pic/2022-07-16/b60219dd-8876-4d7b-acf0-36bb65fff6ac.jpg"
	},
	
	{
		"img": "../../pagesD/static/images/T3.jpg",
		"title": "",
		"price": "￥16.99",
		"name": "T3石墨烯真黑金",
		"picUrl":"https://www.tn-hs.com/pms-pic/2022-07-16/735be642-03c1-413c-9e97-cadafbd6a38a.jpg"
	},
	{
		"img": "../../pagesD/static/images/X7.jpg",
		"title": "",
		"price": "￥999.99",
		"name": "X7",
		"picUrl":"https://www.tn-hs.com/pms-pic/2022-07-16/c1acf279-d07d-4487-8a4d-1bcf2c08e6fe.jpg"
	},
	{
		"img": "../../pagesD/static/images/a6.jpg",
		"title": "",
		"price": "￥99.88",
		"tip": "HOT",
		"name":"A6",
		"picUrl":"../../pagesD/static/images/A6_L.jpg"
	},
	{
		"img": "../../pagesD/static/images/E5.jpg",
		"title": "",
		"price": "￥698.99",
		"name": "金刚E5",
		"picUrl":"https://www.tn-hs.com/pms-pic/2022-07-16/6c6137fd-a7d5-4170-936e-400525f4028b.jpg"
	},
	{
		"img": "../../pagesD/static/images/cp.jpg",
		"title": "",
		"price": "￥22.99",
		"name": "超跑石墨烯",
		"picUrl":"../../pagesD/static/images/cp_L.jpg"
	},
	
	{
		"img": "../../pagesD/static/images/dlw.jpg",
		"title": "",
		"price": "￥22.99",
		"name": "动力王",
		"picUrl":"../../pagesD/static/images/dlw_L.jpg"
	},
	
	
	{
		"img": "../../pagesD/static/images/cpw2.jpg",
		"title": "",
		"price": "￥698.99",
		"name": "长跑王二代",
		"picUrl":"../../pagesD/static/images/cpw2_L.jpg"
	},
	{
		"img": "../../pagesD/static/images/csw.jpg",
		"title": "",
		"price": "￥698.99",
		"name": "长寿王",
		"picUrl":"../../pagesD/static/images/csw_L.jpg"
	}
];

var getArrRandomly = function (arr) {
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		var randomIndex = Math.floor(Math.random() * (len - i));
		var itemAtIndex = arr[randomIndex];
		arr[randomIndex] = arr[i];
		arr[i] = itemAtIndex;
	}
	return arr;
}
module.exports  = {
	products : products,
	getArrRandomly : getArrRandomly
} 
