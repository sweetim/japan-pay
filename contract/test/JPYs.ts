import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers"
import { expect } from "chai"
import hre from "hardhat"

describe("JPYs", function() {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const [ owner, user_1 ] = await hre.viem.getWalletClients()

    const jpys = await hre.viem.deployContract(
      "JPYs",
      [],
    )

    const publicClient = await hre.viem.getPublicClient()

    return {
      jpys,
      owner,
      user_1,
      publicClient,
    }
  }

  describe("Mint", function() {
    it("Should able to mint", async function() {
      const { jpys, owner, user_1 } = await loadFixture(deployOneYearLockFixture)

      expect(
        await jpys.read.balanceOf([
          owner.account.address,
        ]),
      ).to.be.eq(BigInt(0))

      const tx = await jpys.write.mint([
        owner.account.address,
        BigInt(1_000),
      ])

      expect(
        await jpys.read.balanceOf([
          owner.account.address,
        ]),
      ).to.be.eq(BigInt(1_000))
    })
  })
})
