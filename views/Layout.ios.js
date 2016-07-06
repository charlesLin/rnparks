import React, {Component} from 'react';
import { View, Text, TabBarIOS, StyleSheet, NavigatorIOS } from 'react-native';
import Parks from './Parks';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "Parks"
        }
    }

    render() {
        return (
            <TabBarIOS>
                <TabBarIOS.Item title="Parks" style={styles.container}
                    onPress={ () => { this.setState({ selectedTab: "Parks" }) } }
                    selected={this.state.selectedTab === "Parks"}>
                    <NavigatorIOS initialRoute={{
                        component: Parks, title:"公園清單"
                    }}
                        style={{height: 20, flex: 1}}
                        ></NavigatorIOS>
                </TabBarIOS.Item>
                <TabBarIOS.Item title="Settings" style={styles.container}
                    onPress={ () => { this.setState({ selectedTab: "Settings" }) } }
                    selected={this.state.selectedTab === "Settings"}>
                    <View>
                        <Text>Settings</Text>
                    </View>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});

export default Layout;