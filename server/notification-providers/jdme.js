const NotificationProvider = require("./notification-provider");
const axios = require("axios");
const { DOWN, UP } = require("../../src/util");

class JdMe extends NotificationProvider {

    name = "JdMe";

    async send(notification, msg, monitorJSON = null, heartbeatJSON = null) {
        let okMsg = "Sent Successfully.";

        try {
            // let WeComUrl = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=" + notification.weComBotKey;
            // let config = {
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // };
            // let body = this.composeMessage(heartbeatJSON, msg);
            // await axios.post(WeComUrl, body, config);
            let AppAccessToken = getAppAccessToken(notification.appKey, notification.appSecret)
            let TeamAccessToken = getTeamAccessToken(appAccessToken, notification.openTeamId)
            const sendUrl = "https://openme.jd.com/open-api/suite/v1/timline/sendRobotMsg";
            let config = {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "x-stage": "PROD",
                    "authorization":"Bearer "+TeamAccessToken
                }
            };
            const body = {
                appId: "Pg5Uxl4dD8qpd27Pfe3z",
               groupId:"1023551714",
                requestId: "${random()} ",
                params: {
                    robotId: "00_68e398e55e9a4202",
                    body: {
                        type: "text",
                        content: "{{msg}}\n时间:{{heartbeatJSON['time']}} "
                    }
                }
            };
      
       
            await axios.post(sendUrl, body, config);
           
            return okMsg;
        } catch (error) {
            this.throwGeneralAxiosError(error);
        }
    }

   
    /** 
     * 调用获取AppAccessToken
     * @param {String} appKey
     * @param {string} appSecret
     * @returns {String}
     */
    getAppAccessToken(appKey, appSecret) {
        try {
            const tokenUrl = "https://openme.jd.com/open-api/auth/v1/app_access_token";
            const config = {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "x-stage": "PROD"
                }
            };
            let body = {
                appKey:appKey,
                appSecret:appSecret
            };
      
       
            let response = await axios.post(tokenUrl, body, config);
            return response.data.appAccessToken;
        } catch (error) {
            this.throwGeneralAxiosError(error);
        }
      }

    /** 
     * 调用获取TeamAccessToken
     * @param {String} appAccessToken
     * @param {string} openTeamId
     * @returns {String}
     */
     getTeamAccessToken(appAccessToken, openTeamId) {
        try {
            const tokenUrl = "https://openme.jd.com/open-api/auth/v1/team_access_token";
            const config = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-stage": "PROD"
            }
            };
            let body = {
                appAccessToken:appAccessToken,
                openTeamId:openTeamId
            };
      
       
            let response = await axios.post(tokenUrl, body, config);
            return response.data.teamAccessToken;
        } catch (error) {
            this.throwGeneralAxiosError(error);
        }
      }


    /**
     * Generate the message to send
     * @param {Object} heartbeatJSON Heartbeat details (For Up/Down only)
     * @param {string} msg General message
     * @returns {Object}
     */
    composeMessage(heartbeatJSON, msg) {
        let title;
        if (msg != null && heartbeatJSON != null && heartbeatJSON["status"] === UP) {
            title = "UptimeKuma Monitor Up";
        }
        if (msg != null && heartbeatJSON != null && heartbeatJSON["status"] === DOWN) {
            title = "UptimeKuma Monitor Down";
        }
        if (msg != null) {
            title = "UptimeKuma Message";
        }
        return {
            msgtype: "text",
            text: {
                content: title + msg
            }
        };
    }
}

module.exports = JdMe;
