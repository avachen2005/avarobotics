import XCTest
@testable import AvaRobotics

final class SpacingTokenTests: XCTestCase {

    func testSpacingValues() {
        XCTAssertEqual(SpacingToken.xs, 4)
        XCTAssertEqual(SpacingToken.sm, 8)
        XCTAssertEqual(SpacingToken.md, 16)
        XCTAssertEqual(SpacingToken.lg, 24)
        XCTAssertEqual(SpacingToken.xl, 32)
        XCTAssertEqual(SpacingToken.xxl, 48)
        XCTAssertEqual(SpacingToken.xxxl, 64)
    }

    func testMonotonicallyIncreasing() {
        let values = [
            SpacingToken.xs,
            SpacingToken.sm,
            SpacingToken.md,
            SpacingToken.lg,
            SpacingToken.xl,
            SpacingToken.xxl,
            SpacingToken.xxxl
        ]
        for i in 0..<(values.count - 1) {
            XCTAssertLessThan(values[i], values[i + 1])
        }
    }
}
