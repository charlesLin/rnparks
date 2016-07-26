import React, {Component} from 'react';
import { View, Text, TabBarIOS, StyleSheet, NavigatorIOS } from 'react-native';
import Parks from './Parks';
import Demo from './Demo';
import Icon from 'react-native-vector-icons/FontAwesome';
import BarCode from './BarCode';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import rootReducer from '../reducers/';

import * as parksActions from '../actions/parksActions';

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
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <BarCode style={{ marginTop: 20 }} value={"1234567890"}
                                width={225}
                                height={170}
                                bgColor="#e7e7eb"
                                />
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

const mapStateToProps = (state) => {
    return {
        parks: state.parks
    };
};

const mapDispatchToPros = (dispatch) => {
    return {
        actions: bindActionCreators(parksActions.loadParks, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToPros)(Layout);