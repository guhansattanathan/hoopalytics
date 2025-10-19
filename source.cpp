
vector<double> convertMetric(const vector<double>& coefficient, const vector<vector<int>>& playerDatas) {
    //for a vec of players
    //same name as the one player. for polymorph and flexible use.
    vector<double>scores;
    scores.reserve(playerDatas.size());
    for (const auto& data : playerDatas) {
        scores.push_back(convertMetric(coefficient, data));
    }
    return scores;
}
double convertMetric(const vector<double>& coefficient, const vector<int>& playerData) {
    //for one player only
    //playerData in fixed format. do cross product.
    //coefficient all default to 0,unless given a value. if 0 in between, need to specify
    //eg. 0.1, 0.02, 0.3, 0, 1, 2
    double sum = 0.0;
    for (int i = 0;i < min(coefficient.size(), playerData.size());i++) {
        sum += (coefficient[i] * playerData[i]);
    }
    return sum;
}