import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers"
import { expect } from "chai"
import hre from "hardhat"

describe("JapanPayShop", function() {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployJapanPayShop() {
    const [ owner, user_1 ] = await hre.viem.getWalletClients()

    const japanPayShop = await hre.viem.deployContract(
      "JapanPayShop",
      [],
    )
    const jpyc = await hre.viem.deployContract(
      "JPYC",
      [],
    )

    const publicClient = await hre.viem.getPublicClient()

    await jpyc.write.mint([
      user_1.account.address,
      BigInt(100_000),
    ])

    await japanPayShop.write.registerToken([
      jpyc.address,
    ])

    await user_1.writeContract({
      abi: jpyc.abi,
      address: jpyc.address,
      functionName: "approve",
      args: [
        japanPayShop.address,
        BigInt(100_000),
      ],
    })

    return {
      japanPayShop,
      jpyc,
      owner,
      user_1,
      publicClient,
    }
  }

  it("Should able to pay and withdraw", async function() {
    const {
      japanPayShop,
      jpyc,
      owner,
      user_1,
      publicClient,
    } = await loadFixture(deployJapanPayShop)

    expect(await jpyc.read.balanceOf([ user_1.account.address ]))
      .to.be.eq(BigInt(100_000))

    await user_1.writeContract({
      abi: japanPayShop.abi,
      address: japanPayShop.address,
      functionName: "pay",
      args: [
        "id",
        BigInt(10_800),
      ],
    })

    expect(await jpyc.read.balanceOf([ user_1.account.address ]))
      .to.be.eq(BigInt(90_000))
  })

  it("Should not be tax free", async function() {
    const {
      japanPayShop,
      jpyc,
      owner,
      user_1,
      publicClient,
    } = await loadFixture(deployJapanPayShop)

    await expect(
      user_1.writeContract({
        abi: japanPayShop.abi,
        address: japanPayShop.address,
        functionName: "pay",
        args: [
          "id",
          BigInt(100),
        ],
      }),
    ).to.be.reverted
  })
})
