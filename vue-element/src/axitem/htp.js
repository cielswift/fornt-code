const baseurl = "http://127.0.0.1:29090/quick/";

const htp = {
	axios: null,
    //设置参数格式
    json: 1, //json 提交 application/json
    query: 2, //url后拼接参数 ?name=xiapeixin
    form: 3, // form 提交 application/x-www-form-urlencoded
    path: 4, // 路径参数提交, 替换路径上的参数;
    data: 5, // 文件上传 multipart/form-data

    get: function (url, param, type, config,success, defeat, always) {
        let parset = this.parset(url,param, type,config);

        this.axios.get(baseurl + parset.url,config)
            .then(success)
            .catch(defeat)
            .then(always)
    },
    post: function (url, param,  type, config,success, defeat, always) {
        let parset = this.parset(url,param, type,config);

        this.axios.post(baseurl + parset.url, parset.param,config)
            .then(success)
            .catch(defeat)
            .then(always)
    },

    put: function (url, param,  type, config,success, defeat, always) {
        let parset = this.parset(url,param, type,config);

        this.axios.put(baseurl + parset.url, parset.param,config)
            .then(success)
            .catch(defeat)
            .then(always)
    },

     del: function (url, param,  type, config,success, defeat, always) {
        let parset = this.parset(url,param, type,config);

       this.axios.delete(baseurl + parset.url,config)
            .then(success)
            .catch(defeat)
            .then(always)
    },

    parset(url, parm, type, config) {

        let obj = {
            url : "",
            param: ""
        };

        if (type === 1) {
             obj.url = url;
             obj.param =parm;
             config.headers["content-type"]="application/json";
        } else if (type === 2) {

            let temp = "";
            for (let ix in parm) {
                 temp =  temp +  ix + "=" + parm[ix] + "&"
            }
            obj.url = url + +"?"+temp;

        } else if (type === 3) {

            let temp = "";
            for (let ix in parm) {
              temp =  temp +  ix + "=" + parm[ix] + "&"
            }

            obj.url = url;
            obj.param = temp;
            config.headers["content-type"]="application/x-www-form-urlencoded";

        } else if (type === 4) {

            for (let ix in parm) {
               url =  url.toString().replace("{"+ix+"}",parm[ix])
            }
            obj.url = url;

        } else if (type === 5) {
              obj.url = url;
              obj.param = parm;
              config.headers["content-type"]="multipart/form-data";
        } else {
           obj.url = url;
           obj.param =parm;
        }
        return obj;
    }
};

export default htp;