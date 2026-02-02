import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "figure.yoga")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("YogaApp")
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
