import React, {Component} from 'react';
import { View, Text, TabBarIOS, StyleSheet, NavigatorIOS } from 'react-native';
import Parks from './Parks';
import Demo from './Demo';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                <Icon.TabBarItemIOS title="Parks" style={styles.container}
                    onPress={ () => { this.setState({ selectedTab: "Parks" }) } }
                    selected={this.state.selectedTab === "Parks"}
                    iconName="tree"
                    >
                    <NavigatorIOS initialRoute={{
                        component: Parks,
                        title: "公園清單"
                    }}
                        style={{ height: 20, flex: 1 }}

                        ></NavigatorIOS>
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS title="Settings" style={styles.container}
                    onPress={ () => { this.setState({ selectedTab: "Settings" }) } }
                    selected={this.state.selectedTab === "Settings"}
                    iconName="cog"
                    >
                    <View>
                        <Text>Settings</Text>
                    </View>
                </Icon.TabBarItemIOS>
            </TabBarIOS>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //marginTop: 20
    }
});

export default Layout;