module.exports = {
    answers : [
        `
        #include <bits/stdc++.h>
        using namespace std;
        int main(){            
            int a[3],b[3];
            for(int i=0;i<3;i++)
            {
                cin>>a[i];
            }
            for(int i=0;i<3;i++)
            {
                cin>>b[i];
            }
            int al=0,bo=0;
            for(int i=0;i<3;i++)
            {
                if(a[i] > b[i])al++;
                if(a[i] < b[i])bo++;
            }
            cout<<al<<" "<<bo;
        }`
    ]
}