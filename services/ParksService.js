class ParksService {

    getParks(where, skip, limit) {
        var url = "http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=8f6fcb24-290b-461d-9d34-72ed1b3f51f0";
        if (limit) url += "&limit=" + limit;
            if (skip) url += "&offset=" + skip;

            if (where)
                url += "&q=" + where;

        return fetch(url, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
            },
        }).then(resp => {
            let json = resp.json();
            if (resp.status >= 200 && resp.status < 300) {
                return json;
            }
            else {
                return json.then(err => {
                    throw err;
                });
            }
        })
            .catch(e => {
                console.log(e);
                throw e;
            });;
    }
}
export default ParksService;
