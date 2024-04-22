/* @flow */

import Reactotron, { networking, openInEditor, asyncStorage, trackGlobalErrors } from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import sagaPlugin from 'reactotron-redux-saga';
import appInfo from '../../../app.json';

class ReactotronWrapper {
    static ref: Object;

    static get(): Object {
        return ReactotronWrapper.ref;
    }

    static connect() {
        ReactotronWrapper.ref = Reactotron
            .configure({
                /** @todo ip local */
                //host: '192.168.0.117',
//                host: '192.168.100.6',
                host: 'localhost',
                name: appInfo.displayName,
                secure: false
            })
            .useReactNative({
                asyncStorage: true,
                ignoreUrls: /symbolicate/
            })
            .use(asyncStorage())
            .use(trackGlobalErrors({
                veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0
            }))
            .use(reactotronRedux())
            .use(sagaPlugin())
            .use(openInEditor())
            .use(networking({
                ignoreContentTypes: /^(image)\/.*$/i
            })).connect();

        Reactotron.clear();

        /* $FlowFixMe */
        console.t = Reactotron;
    }
}

export default ReactotronWrapper;
